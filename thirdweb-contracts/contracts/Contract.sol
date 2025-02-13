// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract AssetManager {
    address public deployer;
    
    constructor() {
        deployer = msg.sender;
    }

    struct AssetDetails {
        uint256 id;
        string name;
        address owner;
        string[] keys;
        string[] values;
    }

    // Core assets storage
    AssetDetails[] private assets;
    
    // Dynamic properties storage
    mapping(uint256 => mapping(string => string)) private assetProperties;
    mapping(uint256 => string[]) private assetPropertyKeys;
    mapping(uint256 => mapping(string => bool)) private assetKeyExists;

    // Ownership tracking
    mapping(address => uint256[]) private ownerAssets;
    mapping(address => mapping(uint256 => uint256)) private ownerAssetIndex;
    
    // Asset existence tracking
    mapping(uint256 => bool) private assetExists;

    // Enhanced event for activity tracking
    event AssetActivity(
        uint256 indexed assetId,
        address indexed actor,
        string transactionType, // "CREATE", "TRANSFER", "PROPERTY_UPDATE"
        string data
    );
    
    event AssetCreated(uint256 indexed id, address indexed owner, string name);
    event AssetTransferred(uint256 indexed id, address indexed from, address indexed to);
    event AssetPropertyUpdated(uint256 indexed id, string key, string value);

    function createAsset(
        uint256 _id,
        string memory _name,
        string[] memory _keys,
        string[] memory _values
    ) external {
        require(!assetExists[_id], "Asset ID already exists");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(_keys.length == _values.length, "Mismatched keys and values");

        assets.push(AssetDetails(_id, _name, msg.sender, _keys, _values));
        assetExists[_id] = true;

        for (uint256 i = 0; i < _keys.length; i++) {
            _setProperty(_id, _keys[i], _values[i]);
        }

        ownerAssets[msg.sender].push(_id);
        ownerAssetIndex[msg.sender][_id] = ownerAssets[msg.sender].length - 1;
        
        // Emit enhanced event
        emit AssetActivity(_id, msg.sender, "CREATE", _name);
        emit AssetCreated(_id, msg.sender, _name);
    }

    function setAssetProperty(uint256 _id, string memory _key, string memory _value) external {
        require(assetExists[_id], "Asset does not exist");
        AssetDetails storage asset = _getAssetById(_id);
        require(asset.owner == msg.sender, "Not asset owner");
        
        _setProperty(_id, _key, _value);
        // Emit enhanced event
        emit AssetActivity(_id, msg.sender, "PROPERTY_UPDATE", string(abi.encodePacked(_key, ":", _value)));
        emit AssetPropertyUpdated(_id, _key, _value);
    }

    function _setProperty(uint256 _id, string memory _key, string memory _value) private {
        assetProperties[_id][_key] = _value;
        if (!assetKeyExists[_id][_key]) {
            assetPropertyKeys[_id].push(_key);
            assetKeyExists[_id][_key] = true;
        }
    }

    // Get property keys for an asset
    function getAssetPropertyKeys(uint256 _id) external view returns (string[] memory) {
        require(assetExists[_id], "Asset does not exist");
        return assetPropertyKeys[_id];
    }

    // Get specific property value
    function getAssetProperty(uint256 _id, string memory _key) external view returns (string memory) {
        require(assetExists[_id], "Asset does not exist");
        return assetProperties[_id][_key];
    }

    // Get all assets in the system
    function getAllAssets() external view returns (AssetDetails[] memory) {
        return assets;
    }

    // Modified function to return all asset details for an owner
    function getAssetsByOwner(address _owner) external view returns (AssetDetails[] memory) {
        uint256[] memory assetIds = ownerAssets[_owner];
        AssetDetails[] memory result = new AssetDetails[](assetIds.length);

        for (uint256 i = 0; i < assetIds.length; i++) {
            uint256 assetId = assetIds[i];
            AssetDetails memory asset = _getAssetById(assetId);

            // Fetch custom properties
            string[] memory keys = assetPropertyKeys[assetId];
            string[] memory values = new string[](keys.length);

            for (uint256 j = 0; j < keys.length; j++) {
                values[j] = assetProperties[assetId][keys[j]];
            }

            // Populate the result
            result[i] = AssetDetails({
                id: asset.id,
                name: asset.name,
                owner: asset.owner,
                keys: keys,
                values: values
            });
        }

        return result;
    }


    // Get detailed information about an asset
    // Get core asset details
    function getAssetDetails(uint256 _id) external view returns (AssetDetails memory) {
        require(assetExists[_id], "Asset does not exist");

        AssetDetails memory asset = _getAssetById(_id);

        // Fetch custom properties
        string[] memory keys = assetPropertyKeys[_id];
        string[] memory values = new string[](keys.length);

        for (uint256 i = 0; i < keys.length; i++) {
            values[i] = assetProperties[_id][keys[i]];
        }

        // Return the full details
        return AssetDetails({
            id: asset.id,
            name: asset.name,
            owner: asset.owner,
            keys: keys,
            values: values
        });
    }

    function addressToString(address _addr) internal pure returns (string memory) {
        bytes memory data = abi.encodePacked(_addr);
        bytes memory alphabet = "0123456789abcdef";
        
        bytes memory str = new bytes(42); // 0x + 40 characters
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(data[i] >> 4)];
            str[3+i*2] = alphabet[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }



    // Transfer asset ownership
    function transferAsset(uint256 _id, address _newOwner) external {
        require(assetExists[_id], "Asset does not exist");
        require(_newOwner != address(0), "Invalid new owner");
        
        AssetDetails storage asset = _getAssetById(_id);
        require(asset.owner == msg.sender, "Not asset owner");
        
        // Remove from current owner's list
        _removeFromOwner(asset.owner, _id);
        
        // Update ownership
        asset.owner = _newOwner;
        
        // Add to new owner's list
        ownerAssets[_newOwner].push(_id);
        ownerAssetIndex[_newOwner][_id] = ownerAssets[_newOwner].length - 1;
        
        // Emit enhanced event
        emit AssetActivity(_id, msg.sender, "TRANSFER", addressToString(_newOwner));
        emit AssetTransferred(_id, msg.sender, _newOwner);
    }

    // Helper function to find asset by ID
    function _getAssetById(uint256 _id) private view returns (AssetDetails storage) {
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