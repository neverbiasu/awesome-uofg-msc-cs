package JavaSecurityDemo;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

/*==============*/
public class MainJavaCrypto
	{

/*-------------------------------------*/
public	static	void main(String[] args)
/*-------------------------------------*/
	{
/*
 *  AES key
 */

	SecretKey	aes_key = null;
	try
		{
		KeyGenerator	kg = KeyGenerator.getInstance("AES");
		kg.init(128);	// key length 128
		aes_key = kg.generateKey();
		}
	catch (NoSuchAlgorithmException e)
		{
		System.err.println("NoSuchAlgorithmException");
		System.exit(1);
		}
	System.err.print("AES key = ");
	print_bytes(aes_key.getEncoded());

/*
 *  RSA keys
 */
	PublicKey	pk = null;
	PrivateKey	sk = null;
	try
		{
		KeyPairGenerator	kg = KeyPairGenerator.getInstance("RSA");
		kg.initialize(2048);
		KeyPair	kp = kg.generateKeyPair();
		pk = kp.getPublic();
		sk = kp.getPrivate();
		}
	catch (NoSuchAlgorithmException e)
		{
		System.err.println("NoSuchAlgorithmException");
		System.exit(1);
		}
	System.err.print("RSA public key = ");
	print_bytes(pk.getEncoded());
	System.err.print("RSA secret key = ");
	print_bytes(sk.getEncoded());
/*
 *  RSA encryption
 */
	byte[] ciphertext = rsa_encdec(Cipher.ENCRYPT_MODE, pk, "This is Java Security Demo!".getBytes());
	System.err.print("ciphertext = ");
	print_bytes(ciphertext);
	byte[]	plaintext  = rsa_encdec(Cipher.DECRYPT_MODE, sk, ciphertext);
	System.err.println("plaintext = " + new String(plaintext));
/*
 *  Message Digests
 */
	String	mdin = new String("Message Digest long string example, more stuff, and more!!!");
	byte[]	digest = null;
	try
		{
		MessageDigest	md = MessageDigest.getInstance("SHA-256");
		md.update(mdin.getBytes());
		digest = md.digest();
		System.err.print("digest  = ");
		print_bytes(digest);
		}
	catch (NoSuchAlgorithmException e)
		{
		System.err.println("NoSuchAlgorithmException");
		System.exit(1);
		}
/*
 *  Digital signature of message digest
 */
		// sign the digest
	byte[]	signature = rsa_encdec(Cipher.ENCRYPT_MODE, sk, digest);
	System.err.print("signature = ");
	print_bytes(signature);
		// undo the signature
	byte[]	undosig = rsa_encdec(Cipher.DECRYPT_MODE, pk, signature);
	System.err.print("undosig = ");
	print_bytes(undosig);
		// compare the two
	if (MessageDigest.isEqual(digest,  undosig))
		System.err.println("equal");
	else
		System.err.println("DIFFERENT!!!");
/* to comment out some code */
	}

/*-------------------------------------------------------------*/
public	static	byte[]	rsa_encdec(int mode, Key key, byte[] in)
/*-------------------------------------------------------------*/
	{
	Cipher	c = null;
	try
		{
		c = Cipher.getInstance("RSA");
		c.init(mode,  key);
		return c.doFinal(in);
		}
	catch (NoSuchAlgorithmException e)
		{
		System.err.println("NoSuchAlgorithmException");
		System.exit(1);
		} 
	catch (NoSuchPaddingException e)
		{
		System.err.println("NoSuchPaddingException");
		System.exit(1);
		}
	catch (InvalidKeyException e)
		{
		System.err.println("InvalidKeyException");
		System.exit(1);
		}
	catch (IllegalBlockSizeException e)
		{
		System.err.println("IllegalBlockSizeException");
		System.exit(1);
		}
	catch (BadPaddingException e)
		{
		System.err.println("BadPaddingException");
		System.exit(1);
		}
	return null;
	}

/*------------------------------------------*/
public	static	void	print_bytes(byte[] b)
/*------------------------------------------*/
	{
	System.err.print(" [" + b.length + "] ");
	for (int i = b.length - 1; i >= 0; i--)
		{
		int	k = (int) b[i] & 0xff;	// make unsigned
		int	k1 = k & 0xf;
		int	k2 = (k >> 4) & 0xf;
		System.err.print(String.format("%x%x", k1, k2));
		}
	System.err.print("\n");
	}

	}
