package com.example.tipphub.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Message> getAllMessagesFromAuthor(Long authorId) {
        return messageService.findAllMessagesFromAuthor(authorId);
    }

    @GetMapping("/getReceiverMessages/{id}")
    public List<Message> getAllMessagesFromReceiver(Long receiverId) {
        return messageService.findAllMessagesFromReceiver(receiverId);
    }
}
