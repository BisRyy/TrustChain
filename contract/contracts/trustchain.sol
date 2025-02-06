// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AssetManager {
    // Structure to represent an Asset
    struct Asset {
        uint256 id;
        string name;
        address currentOwner;
        bool exists;
    }
    
    // Structure to store each transaction in the asset's history
    struct Transaction {
        uint256 assetId;
        address from;
        address to;
        uint256 timestamp;
    }
    
    // Mapping to store assets by ID
    mapping(uint256 => Asset) public assets;
    // Mapping to store transaction history per asset
    mapping(uint256 => Transaction[]) public assetHistory;
    // Mapping to store dynamic properties for each asset (key => value)
    mapping(uint256 => mapping(string => string)) public assetProperties;
    
    // Events for asset creation, transfer, and property updates
    event AssetCreated(uint256 indexed assetId, string name, address indexed owner);
    event AssetTransferred(uint256 indexed assetId, address indexed from, address indexed to, uint256 timestamp);
    event AssetPropertyUpdated(uint256 indexed assetId, string key, string value);
    
    // Counter for asset IDs
    uint256 public nextAssetId = 1;
    
    // Create a new asset with a given name.
    // Dynamic properties can be set later.
    function createAsset(string memory _name) public returns (uint256) {
        uint256 assetId = nextAssetId;
        assets[assetId] = Asset({
            id: assetId,
            name: _name,
            currentOwner: msg.sender,
            exists: true
        });
        nextAssetId++;
        
        emit AssetCreated(assetId, _name, msg.sender);
        return assetId;
    }
    
    // Transfer asset ownership and record the transaction
    function transferAsset(uint256 _assetId, address _newOwner) public {
        require(assets[_assetId].exists, "Asset does not exist");
        require(msg.sender == assets[_assetId].currentOwner, "Only the owner can transfer the asset");
        require(_newOwner != address(0), "Invalid new owner address");
        
        address previousOwner = assets[_assetId].currentOwner;
        assets[_assetId].currentOwner = _newOwner;
        
        Transaction memory txn = Transaction({
            assetId: _assetId,
            from: previousOwner,
            to: _newOwner,
            timestamp: block.timestamp
        });
        assetHistory[_assetId].push(txn);
        
        emit AssetTransferred(_assetId, previousOwner, _newOwner, block.timestamp);
    }
    
    // Update or add a dynamic property for an asset.
    // Only the current owner can update properties.
    function updateAssetProperty(uint256 _assetId, string memory _key, string memory _value) public {
        require(assets[_assetId].exists, "Asset does not exist");
        require(msg.sender == assets[_assetId].currentOwner, "Only the owner can update properties");
        
        assetProperties[_assetId][_key] = _value;
        emit AssetPropertyUpdated(_assetId, _key, _value);
    }
    
    // Retrieve the transaction history for an asset.
    function getAssetHistory(uint256 _assetId) public view returns (Transaction[] memory) {
        require(assets[_assetId].exists, "Asset does not exist");
        return assetHistory[_assetId];
    }
    
    // Verify authenticity: check if an asset exists and return its current owner.
    function verifyAsset(uint256 _assetId) public view returns (bool, address) {
        if (assets[_assetId].exists) {
            return (true, assets[_assetId].currentOwner);
        } else {
            return (false, address(0));
        }
    }
    
    // Retrieve a dynamic property for a given asset and key.
    function getAssetProperty(uint256 _assetId, string memory _key) public view returns (string memory) {
        require(assets[_assetId].exists, "Asset does not exist");
        return assetProperties[_assetId][_key];
    }
}
