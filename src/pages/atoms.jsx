import React, {useState} from 'react';
import Head from 'next/head'

import Button from '@/components/atoms/Button'
import SocialIcons from '@/components/atoms/SocialIcons'



function atoms() {

  return (
    <>

      <Head>
        <title>Atoms</title>
      </Head>

      <SocialIcons />
      <Button type={1} fetchUrl={''} />
      <Button type={2} fetchUrl={''} />
      <Button type={3} fetchUrl={''} />
      <Button type={4} fetchUrl={''} />




    </>
  );
}

export default atoms;
