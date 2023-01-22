package com.example.tipphub.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
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

    @GetMapping("/getAuthorMessages/{authorId}")
    public List<Message> getAllMessagesFromAuthor(@PathVariable Long authorId) {
        return messageService.findAllMessagesFromAuthor(authorId);
    }

    @GetMapping("/getReceiverMessages/{receiverId}")
    public List<Message> getAllMessagesFromReceiver(@PathVariable Long receiverId) {
        return messageService.findAllMessagesFromReceiver(receiverId);
    }

    @GetMapping("/getChat/{userId}/{friendId}")
    public List<Message> getChat(@PathVariable Long userId, @PathVariable Long friendId) {
        return messageService.getChat(userId, friendId);
    }

    @GetMapping("/getGroupChat")
    public List<Message> getGroupChat(@RequestParam List<Long> users) {
        return messageService.getGroupChatMessages(users);
    }

    @PutMapping("/messageToSave/{authorId}/{receiverId}")
    public void saveMessageToUser(@RequestBody Message message, @PathVariable Long authorId, @PathVariable Long receiverId) {
        message.setMessageAuthor(messageService.findUserById(authorId));
        message.setReceiver(messageService.findUserById(receiverId));
        messageService.save(message);
    }

    @PutMapping("/groupMessageToSave/{authorId}")
    public void saveMessageGroupChat(@RequestBody Message message, @PathVariable Long authorId) {
        message.setMessageAuthor(messageService.findUserById(authorId));
        messageService.save(message);
    }
}
