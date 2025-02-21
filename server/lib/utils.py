def get_fields(data, keys):
    for key in keys:
        if not data.get(key, False): 
            return False, {}
    
    return True, data


import json

def filter_data(data: str):
    PAYLOAD = {
        'AUTH': ['token'],
        'PLAYER': ['pid'],
        'TEAM': ['uid', 'amt'],
        'REVERT': ['entry_id']
    }

    try:
        res = json.loads(data)
        for key in PAYLOAD[res['action']]: res[key]
        return True, res
    except: return False, { "valid": False, "message": "Invalid payload!" }
