"use client";
import { useState, useEffect } from "react";
import { Container, Grid, Paper, Text, Image } from "@mantine/core";
import data from "../../data/country.json";

interface Language {
  code: string;
  name: string;
  flag: string;
}

export default function LanguageSelector() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  useEffect(() => {
    const cData = data;
    setLanguages(cData);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
  };

  return (
    <Container
      size="xl"
      style={{ padding: "5rem", backgroundColor: "#17171E" }}
    >
      <Grid>
        {languages.map((language) => (
          <Grid.Col key={language.code} span={2}>
            <Paper
              p="xs"
              shadow="md"
              style={{
                cursor: "pointer",
                backgroundColor:
                  language.code === currentLanguage ? "#1A1B1E" : "transparent",
                border: "1px solid #424242",
              }}
              onClick={() => handleLanguageChange(language.code)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={30}
                  height={20}
                />
                <Text size="xs" ta="center" mt={5}>
                  {language.name}
                </Text>
              </div>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
