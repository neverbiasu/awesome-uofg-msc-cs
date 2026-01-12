#!/bin/sh

PRIVATE_KEY="ECDSA.sk"
PUBLIC_KEY="ECDSA.pub"
BITCOIN_PRIVATE_KEY="bitcoin.sk"
BITCOIN_PUBLIC_KEY="bitcoin.pub"

echo "Generating private key"
openssl ecparam -genkey -name secp256k1 -noout -out $PRIVATE_KEY

echo "Generating public key"
openssl ec -in $PRIVATE_KEY -pubout -out $PUBLIC_KEY

echo "Generating Bitcoin private key"
openssl ec -in $PRIVATE_KEY -outform DER|tail -c +8|head -c 32|xxd -p -c 32 > $BITCOIN_PRIVATE_KEY

echo "Generating Bitcoin public key"
openssl ec -in $PRIVATE_KEY -pubout -outform DER|tail -c 65|xxd -p -c 65 > $BITCOIN_PUBLIC_KEY
