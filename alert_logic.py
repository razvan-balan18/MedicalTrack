def check_alert(data):
    if data.heart_rate > 140 or data.bp_sys > 150 or data.spo2 < 90:
        return True
    return False
