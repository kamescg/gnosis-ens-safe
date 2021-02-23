import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";
import { utils } from "ethers";
import { useContractENS } from "../hooks/useContractsBase";

import { Button, Input, Spacer } from "../components";
import { generateSalt } from "../utils/ens";

import constants from "../constants";
export const FormRegisterDomain = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const contractENS = useContractENS();
  const { register, handleSubmit, watch, errors } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const formValues = watch();

  const handleCommit = async () => {
    try {
      const NAME = formValues.domain;
      const OWNER = safe.safeAddress;
      const SALT = generateSalt();
      // const SALT =
      // "0x59664a0bed8f085a16690c585005a5deb6993561fa2a6d5b39e0c027964e4375";
      const COMMITMENT = await contractENS.makeCommitmentWithConfig(
        NAME,
        OWNER,
        SALT,
        constants.ensResolver,
        safe.safeAddress
      );
      const COMMITMENT_TX = await contractENS.commit(COMMITMENT);
      const { safeTxHash } = await sdk.txs.send({
        txs: [{ ...COMMITMENT_TX, value: "300000000000000000000" }],
      });

      localStorage.setItem("salt", SALT);
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      localStorage.setItem("ensCommitTxHash", safeTx.transactionHash);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const NAME = values.domain;
      console.log(NAME, "NAME");
      const OWNER = safe.safeAddress;
      const DURATION = 315360000;
      const SECRET = localStorage.getItem("salt");
      // const SECRET2 =
      // "0x59664a0bed8f085a16690c585005a5deb6993561fa2a6d5b39e0c027964e4375";
      const PRICE = (await contractENS.rentPrice(NAME, DURATION)) * 2.1;
      const REGISTER_TX = await contractENS.registerWithConfig(
        NAME,
        OWNER,
        DURATION,
        SECRET,
        constants.ensResolver,
        safe.safeAddress,
        {
          // value: await contractENS.rentPrice(NAME, DURATION),
          value: utils.parseEther("30"),
        }
      );

      // const { safeTxHash } = await sdk.txs.send({
      //   txs: [
      //     {
      //       ...REGISTER_TX,
      //       value: "300000000000000000000",
      //       safeTxGas: 500000000,
      //     },
      //   ],
      // });

      // const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      // localStorage.setItem("ensRegisterTxHash", safeTx.transactionHash);
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="domain" ref={register({ required: true })} />
      {errors.domain && <span>This field is required</span>}
      <Spacer mt={2} />
      <Button type="button" onClick={handleCommit}>
        Commit
      </Button>
      <Button type="submit">Register</Button>
    </form>
  );
};

export default FormRegisterDomain;
