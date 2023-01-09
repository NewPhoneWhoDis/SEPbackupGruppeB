package com.example.tipphub.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/message")
public class MessageController {

    @Autowired
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/getAuthorMessages/{id}")
    public List<Message> getAllMessagesFromAuthor(@PathVariable Long authorId) {
        return messageService.findAllMessagesFromAuthor(authorId);
    }

    @GetMapping("/getReceiverMessages/{id}")
    public List<Message> getAllMessagesFromReceiver(@PathVariable Long receiverId) {
        return messageService.findAllMessagesFromReceiver(receiverId);
    }

    @PutMapping("/messageToSave")
    public void saveMessageToUser(@RequestBody Message message) {
        System.out.println("We are here");
        messageService.save(message);
    }
}
