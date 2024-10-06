import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import { Paperclip, Send, Upload } from "lucide-react";
import React from "react";

export default function EmailSender() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [sendTo, setSendTo] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipients = emailList.length > 0 ? emailList : [sendTo];
    console.log("Sending email:", { recipients, subject, body, attachment });
    // Reset form after submission
    setSubject("");
    setBody("");
    setAttachment(null);
    setSendTo("");
    setEmailList([]);
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target?.result as string;
        const emails = csv
          .split(/\r\n|\n/)
          .filter((email) => email.trim() !== "");
        setEmailList(emails);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="md"
      mx="auto"
      p={4}
      paddingY={4}
    >
      <Box textAlign="center" mt="8">
        <Text
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          bgGradient="linear(to-r, yellow.400, orange.500)"
          bgClip="text"
          letterSpacing="widest"
        >
          SendEase
        </Text>
        <Text fontSize="lg" color="gray.500" mt="2">
          Fast. Simple. Secure.
        </Text>
      </Box>
      <FormControl isRequired={emailList.length === 0} paddingY={5}>
        <FormLabel htmlFor="sendTo">Send To</FormLabel>
        <Input
          id="sendTo"
          type="email"
          value={sendTo}
          onChange={(e) => setSendTo(e.target.value)}
          placeholder="Enter recipient email"
          isDisabled={emailList.length > 0}
        />
      </FormControl>

      <FormControl paddingY={4}>
        <FormLabel htmlFor="csvUpload">Or Upload Email List (CSV)</FormLabel>
        <Box display="flex" alignItems="center" gap={2}>
          <Input
            id="csvUpload"
            type="file"
            accept=".csv"
            display="none"
            onChange={handleCSVUpload}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("csvUpload")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
          {emailList.length > 0 && (
            <Text fontSize="sm" color="gray.500">
              {emailList.length} email(s) loaded
            </Text>
          )}
        </Box>
      </FormControl>

      <FormControl isRequired paddingY={4}>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor="body">Body</FormLabel>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter email body"
          minH="150px"
        />
      </FormControl>

      <FormControl paddingY={4}>
        <FormLabel htmlFor="attachment">Attachment</FormLabel>
        <Box display="flex" alignItems="center" gap={2}>
          <Input
            id="attachment"
            type="file"
            display="none"
            onChange={(e) => setAttachment(e.target.files?.[0] || null)}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("attachment")?.click()}
          >
            <Paperclip className="mr-2 h-4 w-4" />
            {attachment ? attachment.name : "Add attachment"}
          </Button>
          {attachment && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAttachment(null)}
            >
              Remove
            </Button>
          )}
        </Box>
      </FormControl>

      <Button
        type="submit"
        width="full"
        leftIcon={<Send className="mr-2 h-4 w-4" />}
      >
        Send Email
      </Button>
    </Box>
  );
}
