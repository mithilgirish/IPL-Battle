def get_fields(data, keys):
    res = {}
    for key in keys:
        if not data.get(key, False): 
            return False, {}
        res[key] = data[key]
    
    return True, res