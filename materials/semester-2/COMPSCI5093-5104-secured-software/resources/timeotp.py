import pyotp
import time

if __name__ == '__main__':
    totp = pyotp.TOTP('base32secret3232')
    current_otp = totp.now()
    print(current_otp)
    ver_result = totp.verify(current_otp)  # => True
    print(ver_result)
    time.sleep(30)
    ver_result = totp.verify(current_otp)  # => False
    print(ver_result)