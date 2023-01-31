package com.example.tipphub.chat;

import com.example.tipphub.betround.BetroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/message")
public class MessageController {

    @Autowired
    private final MessageService messageService;
    @Autowired
    private final BetroundRepository betroundRepository;

    public MessageController(MessageService messageService, BetroundRepository betroundRepository) {
        this.messageService = messageService;
        this.betroundRepository = betroundRepository;
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

    @GetMapping("/getGroupChat/{betroundId}")
    public List<Message> getGroupChat(@PathVariable Long betroundId) {
        return messageService.getGroupChatMessages(betroundId);
    }

    @PutMapping("/messageToSave/{authorId}/{receiverId}")
    public void saveMessageToUser(@RequestBody Message message, @PathVariable Long authorId, @PathVariable Long receiverId) {
        message.setMessageAuthor(messageService.findUserById(authorId));
        message.setReceiver(messageService.findUserById(receiverId));
        messageService.save(message);
    }

    @PutMapping("/groupMessageToSave/{authorId}/{betroundId}")
    public void saveMessageGroupChat(@RequestBody Message message, @PathVariable Long authorId, @PathVariable Long betroundId) {
        message.setMessageAuthor(messageService.findUserById(authorId));
        message.setBetround(betroundRepository.findById(betroundId).get());
        messageService.save(message);
    }
}
