from web3 import Web3
import json

web3 = Web3(Web3.HTTPProvider("http://127.0.0.1:7545"))  # Ganache

with open("HealthLogABI.json") as f:
    abi = json.load(f)

contract = web3.eth.contract(address="0x...", abi=abi)  # pune adresa reală după deploy

def log_event(patient_id, event_type):
    acct = web3.eth.accounts[0]
    tx = contract.functions.logEvent(patient_id, event_type).transact({'from': acct})
    web3.eth.wait_for_transaction_receipt(tx)
    print(f"Blockchain log: {event_type} pentru {patient_id}")
