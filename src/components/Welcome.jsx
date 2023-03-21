import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum,SiPimcore } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers, BigNumber } from 'ethers';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";
import { contractABI, contractAddress } from "../utils/constants";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    style={{    outline: '2px solid #96ef9a',
      outlineOffset: '2px'}}
    className="my-2 w-full rounded-sm p-2 bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, buyNow } = useContext(TransactionContext);
  
  async function handleMint() {
    if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // const wallet = new ethers.Wallet(signer);
        console.log(provider,signer,"iiiii")
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
            signer
        );
        const times =1;
        console.log(contract,"cccc")
        // const opts = {value, gasLimit}
        const data = contract.interface.encodeFunctionData("publicSale");

        // const tx = await wallet.sendTransaction({to: contractAddress,value: ethers.utils.parseEther("1")});
          // 等待交易完成
          // const data = contract.interface.encodeFunctionData('publicSale');
          
          // Send transaction
          const transaction = {
            to: contractAddress,
            data:  data,
            value: ethers.utils.parseEther('1'),
          };
          const tx = await signer.sendTransaction(transaction);
        // try {
        //     const response = await  contract.publicSale();
        //     const txHash = await response.wait();
            
        //     console.log(txHash);
        //     console.log('response: ', response);
        // } catch (err) {
        //     console.log("error: " + err)
        // }
    }
}
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
  const Claim =async ()=>{
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const wallet = new ethers.Wallet(signer);
      console.log(provider,signer,"iiiii")
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
          signer
      );
      console.log(contract,"oooo")
       try {
            const response = await  contract.claim();
            const txHash = await response.wait();
            
            console.log(txHash);
            console.log('response: ', response);
        } catch (err) {
            console.log("error: " + err)
        }
    }
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
           Engine Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          <Input placeholder="Core number" name="addressTo" type="text" max="1000" handleChange={handleChange} />
          <button
                  type="button"
                  onClick={handleMint}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Buy now
                </button>
          <button
                  type="button"
                  onClick={Claim}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                 Claim
                </button>
          </p>
          {/* {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )} */}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Core
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiPimcore fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                 Core
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" /> */}

            {/* {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
