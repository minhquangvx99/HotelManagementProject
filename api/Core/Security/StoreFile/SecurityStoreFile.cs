using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Core.Security.StoreFile
{
    public class SecurityStoreFile
    {
        //Link Ref: http://parassanghani.blogspot.com/2010/08/encrypting-and-decrypting-data-in-cnet.html
        //http://www.fluxbytes.com/csharp/encrypt-and-decrypt-files-in-c/
        //http://www.codeproject.com/Articles/26085/File-Encryption-and-Decryption-in-C
        ///<summary>
        ///
        /// Encrypts a file using Rijndael algorithm.
        ///</summary>
        ///<param name="inputFile"></param>
        ///<param name="outputFile"></param>
        private void EncryptFile(string inputFile, string outputFile, string password = "myKey123")
        {
            try
            {
                //string password = @"myKey123"; // Your Key Here
                var UE = new UnicodeEncoding();
                var key = UE.GetBytes(password);

                var cryptFile = outputFile;
                var fsCrypt = new FileStream(cryptFile, FileMode.Create);

                var RMCrypto = new RijndaelManaged();

                var cs = new CryptoStream(fsCrypt,
                    RMCrypto.CreateEncryptor(key, key),
                    CryptoStreamMode.Write);

                var fsIn = new FileStream(inputFile, FileMode.Open);

                int data;
                while ((data = fsIn.ReadByte()) != -1)
                    cs.WriteByte((byte)data);

                fsIn.Close();
                cs.Close();
                fsCrypt.Close();
            }
            catch(Exception ex)
            {
                //("Encryption failed!", "Error");
            }
        }
        ///<summary>
        ///
        /// Decrypts a file using Rijndael algorithm.
        ///</summary>
        ///<param name="inputFile"></param>
        ///<param name="outputFile"></param>
        private void DecryptFile(string inputFile, string outputFile, string password = "myKey123")
        {

            {
                //string password = @"myKey123"; // Your Key Here
                var UE = new UnicodeEncoding();
                byte[] key = UE.GetBytes(password);
                var fsCrypt = new FileStream(inputFile, FileMode.Open);
                var RMCrypto = new RijndaelManaged();

                var cs = new CryptoStream(fsCrypt,
                    RMCrypto.CreateDecryptor(key, key),
                    CryptoStreamMode.Read);

                var fsOut = new FileStream(outputFile, FileMode.Create);

                int data;
                while ((data = cs.ReadByte()) != -1)
                    fsOut.WriteByte((byte)data);

                fsOut.Close();
                cs.Close();
                fsCrypt.Close();
            }
        }
    }
}
