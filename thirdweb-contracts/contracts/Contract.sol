// SPDX-Lense-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract AssetManager {
    address public deployer;
 
    constructor() {
        deployer = msg.sender;
    }

    struct Asset {
        uint256 id;
        string name;
        address owner;
    }

    // All assets storage
    Asset[] private assets;
    
    // Ownership tracking
    mapping(address => uint256[]) private ownerAssets;
    mapping(address => mapping(uint256 => uint256)) private ownerAssetIndex;
    
    // Asset existence tracking
    mapping(uint256 => bool) private assetExists;

    event AssetCreated(uint256 indexed id, address indexed owner, string name);
    event AssetTransferred(uint256 indexed id, address indexed from, address indexed to);

    // Create new asset with unique ID
    function createAsset(uint256 _id, string memory _name) external {
        require(!assetExists[_id], "Asset ID already exists");
        require(bytes(_name).length > 0, "Name cannot be empty");
        
        assets.push(Asset(_id, _name, msg.sender));
        assetExists[_id] = true;
        
        // Add to owner's list
        ownerAssets[msg.sender].push(_id);
        ownerAssetIndex[msg.sender][_id] = ownerAssets[msg.sender].length - 1;
        
        emit AssetCreated(_id, msg.sender, _name);
    }

    // Get all assets in the system
    function getAllAssets() external view returns (Asset[] memory) {
        return assets;
    }

    // Get assets owned by specific address
    function getAssetsByOwner(address _owner) external view returns (uint256[] memory) {
        return ownerAssets[_owner];
    }

    // Get detailed information about an asset
    function getAssetDetails(uint256 _id) external view returns (Asset memory) {
        require(assetExists[_id], "Asset does not exist");
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i].id == _id) {
                return assets[i];
            }
        }
        revert("Asset not found");
    }

    // Transfer asset ownership
    function transferAsset(uint256 _id, address _newOwner) external {
        require(assetExists[_id], "Asset does not exist");
        require(_newOwner != address(0), "Invalid new owner");
        
        Asset storage asset = _getAssetById(_id);
        require(asset.owner == msg.sender, "Not asset owner");
        
        // Remove from current owner's list
        _removeFromOwner(asset.owner, _id);
        
        // Update ownership
        asset.owner = _newOwner;
        
        // Add to new owner's list
        ownerAssets[_newOwner].push(_id);
        ownerAssetIndex[_newOwner][_id] = ownerAssets[_newOwner].length - 1;
        
        emit AssetTransferred(_id, msg.sender, _newOwner);
    }

    // Helper function to find asset by ID
    function _getAssetById(uint256 _id) private view returns (Asset storage) {
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i].id == _id) {
                return assets[i];
            }
        }
        revert("Asset not found");
    }

    // Efficient removal from owner's list using swap-and-pop
    function _removeFromOwner(address _owner, uint256 _id) private {
        uint256 index = ownerAssetIndex[_owner][_id];
        uint256 lastIndex = ownerAssets[_owner].length - 1;

        if (index != lastIndex) {
            uint256 lastId = ownerAssets[_owner][lastIndex];
            ownerAssets[_owner][index] = lastId;
            ownerAssetIndex[_owner][lastId] = index;
        }

        ownerAssets[_owner].pop();
        delete ownerAssetIndex[_owner][_id];
    }
    function _canSetContractURI() internal view virtual returns (bool){
        return msg.sender == deployer;
    }
}