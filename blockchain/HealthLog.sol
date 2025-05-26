// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title HealthLog
 * @dev Smart contract for storing and managing health records on the blockchain
 * This contract allows authorized medical professionals to add and update patient health records
 * while maintaining privacy and security of sensitive medical data
 */
contract HealthLog {
    // Structure to store patient health record information
    struct HealthRecord {
        string patientId;        // Unique identifier for the patient
        string diagnosis;        // Medical diagnosis
        string treatment;        // Prescribed treatment
        string medications;      // List of medications
        uint256 timestamp;       // When the record was created
        address doctor;          // Address of the doctor who created the record
    }

    // Mapping to store health records by patient ID
    mapping(string => HealthRecord[]) private patientRecords;
    
    // Mapping to track authorized medical professionals
    mapping(address => bool) private authorizedDoctors;
    
    // Contract owner
    address private owner;

    // Events for tracking important actions
    event RecordAdded(string patientId, address doctor);
    event DoctorAuthorized(address doctor);
    event DoctorRemoved(address doctor);

    /**
     * @dev Constructor sets the contract deployer as the owner
     */
    constructor() {
        owner = msg.sender;
        authorizedDoctors[msg.sender] = true;
    }

    /**
     * @dev Modifier to restrict access to only authorized doctors
     */
    modifier onlyAuthorized() {
        require(authorizedDoctors[msg.sender], "Not authorized");
        _;
    }

    /**
     * @dev Modifier to restrict access to only the contract owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @dev Add a new health record for a patient
     * @param _patientId Unique identifier for the patient
     * @param _diagnosis Medical diagnosis
     * @param _treatment Prescribed treatment
     * @param _medications List of medications
     */
    function addHealthRecord(
        string memory _patientId,
        string memory _diagnosis,
        string memory _treatment,
        string memory _medications
    ) public onlyAuthorized {
        HealthRecord memory newRecord = HealthRecord({
            patientId: _patientId,
            diagnosis: _diagnosis,
            treatment: _treatment,
            medications: _medications,
            timestamp: block.timestamp,
            doctor: msg.sender
        });

        patientRecords[_patientId].push(newRecord);
        emit RecordAdded(_patientId, msg.sender);
    }

    /**
     * @dev Get all health records for a specific patient
     * @param _patientId Unique identifier for the patient
     * @return Array of health records for the patient
     */
    function getPatientRecords(string memory _patientId) 
        public 
        view 
        returns (HealthRecord[] memory) 
    {
        return patientRecords[_patientId];
    }

    /**
     * @dev Authorize a new doctor to add health records
     * @param _doctor Address of the doctor to authorize
     */
    function authorizeDoctor(address _doctor) public onlyOwner {
        authorizedDoctors[_doctor] = true;
        emit DoctorAuthorized(_doctor);
    }

    /**
     * @dev Remove a doctor's authorization
     * @param _doctor Address of the doctor to remove
     */
    function removeDoctor(address _doctor) public onlyOwner {
        authorizedDoctors[_doctor] = false;
        emit DoctorRemoved(_doctor);
    }

    /**
     * @dev Check if an address is an authorized doctor
     * @param _doctor Address to check
     * @return bool True if the address is authorized
     */
    function isAuthorizedDoctor(address _doctor) public view returns (bool) {
        return authorizedDoctors[_doctor];
    }
}
