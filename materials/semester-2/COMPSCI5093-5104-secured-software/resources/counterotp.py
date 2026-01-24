import pyotp

if __name__ == '__main__':
    hotp = pyotp.HOTP('base32secret3232')
    counter_v0 = hotp.at(0) # => '260182'
    print(counter_v0)
    counter_v1 = hotp.at(1) # => '055283'
    print(counter_v1)
    counter_v1401 = hotp.at(1401) # => '316439'
    print(counter_v1401)


    # OTP verified with a counter
    print(hotp.verify(counter_v1401, 1401)) # => True
    print(hotp.verify(counter_v1401, 1402)) # => False