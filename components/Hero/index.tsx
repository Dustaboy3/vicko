"use client"

import React, { useEffect, useState } from "react";
import { Chip, Group, LoadingOverlay, TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { IconChevronsRight } from '@tabler/icons-react';

const Hero = () => {
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const axios = require('axios');
  const [checked, setChecked] = useState<string>("");

  const data = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
  };

  const handleClick = () => {
    setLoading(true);
    console.log(value)
    if (value) {
      const newMessages = [
        { role: 'user', content: value + "; can you write me a news article from the text and make it " + checked }
      ];
      console.log(value)
      axios.post('https://api.openai.com/v1/chat/completions', { ...data, messages: newMessages }, { headers })
        .then(response => {
          setLoading(false);
          const assistantMessage = (response?.data?.choices[0]?.message?.content);
          console.log(assistantMessage)
          setResult(assistantMessage);
        })
        .catch(error => {
          console.error('Error:', error.response ? error.response.data : error.message);
          setLoading(false);
        }).finally(() => {
          console.log(result)
          setLoading(false);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center" style={{ width: "100%", height: "100%" }}>
        <div className="flex flex-row justify-center items-center" style={{ width: "60%" }}>
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 8 }} />
          <TextInput
            style={{ width: "90%", borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
            placeholder="Input a twitter post"
            onChange={(event) => setValue(event.currentTarget.value)}
          />
          <div style={{
            width: "10%", height: "calc(2.25rem* var(--mantine-scale))"
          }} >
            <Button variant="filled" style={{ width: "100%", borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }} onClick={() => handleClick()}><IconChevronsRight size={33} /></Button>;
          </div>
        </div>
        <div className="flex flex-rowjustify-center items-center mt-4" style={{ width: "60%" }}>
          <Chip.Group>
            <Group justify="space-between" style={{ width: "100%" }}>
              <Chip checked={checked === "happy"} onChange={() => setChecked("happy")}>Happy</Chip>
              <Chip checked={checked === "sad"} onChange={() => setChecked("sad")}>Sad</Chip>
              <Chip checked={checked === "enthousiastic"} onChange={() => setChecked("enthousiastic")}>Enthousiastic</Chip>
              <Chip checked={checked === "controversial"} onChange={() => setChecked("controversial")}>Controversial</Chip>
              <Chip checked={checked === "like a 20 year old wrote it"} onChange={() => setChecked("like a 20 year old wrote it")}>Like 20</Chip>
              <Chip checked={checked === "like a 40 year old wrote it"} onChange={() => setChecked("like a 40 year old wrote it")}>Like 40</Chip>
              <Chip checked={checked === "like a 60 year old wrote it"} onChange={() => setChecked("like a 60 year old wrote it")}>Like 60</Chip>
            </Group>
          </Chip.Group>
        </div>
        <div className="flex flex-row justify-center items-center mt-20" style={{ width: "60%", color: "white", border: "white 3px solid" }}>
          <div style={{ width: "90%" }} dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '</p><p>') }}></div>
        </div>
      </div>
    </>
  );
}

export default Hero;
