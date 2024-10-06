"use client";
import { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Paper,
  Avatar,
  Text,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "../../components/Button/Button.css";

interface FeedbackItem {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

export default function Page() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

  const form = useForm({
    initialValues: {
      name: "",
      message: "",
    },
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      message: (value) =>
        value.trim().length > 0 ? null : "Message is required",
    },
  });

  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedback");
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }
  }, []);

  const handleSubmit = (values: { name: string; message: string }) => {
    const newFeedback: FeedbackItem = {
      id: Date.now(),
      name: values.name,
      message: values.message,
      timestamp: new Date().toLocaleString(),
    };

    const updatedList = [newFeedback, ...feedbackList];
    setFeedbackList(updatedList);
    localStorage.setItem("feedback", JSON.stringify(updatedList));
    form.reset();
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#17171E", padding: "3rem" }}>
      <Paper
        shadow="xs"
        p="md"
        withBorder
        mb="md"
        style={{ backgroundColor: "#1C1C26", border: "1px solid #424242" }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              required
              label="Name"
              placeholder="Enter your name"
              {...form.getInputProps("name")}
            />
            <Textarea
              required
              label="Message"
              placeholder="Enter your message or doubt"
              {...form.getInputProps("message")}
            />
            <button className="message-btn" type="submit">
              Add
            </button>
          </Stack>
        </form>
      </Paper>

      <Stack gap="md">
        {feedbackList.map((item) => (
          <Paper key={item.id} shadow="xs" p="md" withBorder>
            <Group>
              <Avatar color="cyan" radius="xl">
                {item.name.charAt(0).toUpperCase()}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {item.name}
                </Text>
                <Text size="xs" color="dimmed">
                  {item.timestamp}
                </Text>
                <Text size="sm" mt="xs">
                  {item.message}
                </Text>
              </div>
            </Group>
          </Paper>
        ))}
      </Stack>
    </div>
  );
}
