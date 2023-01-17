package com.example.tipphub.chat;

import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Objects;
import java.util.Objects.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getChat(Long userId, Long friendId) {
        User user = userRepository.findById(userId).get();
        User friend = userRepository.findById(friendId).get();

        List<Message> messages = new ArrayList<>();

        List<Message> allMessage = messageRepository.findAll();

        for (Message message : allMessage) {
            if(Objects.equals(message.getMessageAuthor(), user) &&
            Objects.equals(message.getReceiver(), friend)) {
                messages.add(message);
            }
        }

        return  messages;
    }

    @Transactional
    public Message save(Message message) {
        return messageRepository.save(message);
    }

    @Transactional
    public Message addNewMessageByAuthor(Long authorId, String messageContent) {
        User author = userRepository.findById(authorId).get();
        if (author == null) throw new IllegalArgumentException("Invalid author id");
        Message message = new Message();
        message.setMessageAuthor(author);
        message.setMessage(messageContent);
        return message;
    }

    @Transactional
    public List<Message> findAll() {
        return messageRepository.findAll();
    }

    @Transactional
    public Message findById(Long messageId) {
        return messageRepository.findById(messageId).get();
    }

    @Transactional
    public List<Message> findAllMessagesFromAuthor(Long authorId) {
        User author = this.userRepository.findById(authorId).get();
        if (author == null) throw new IllegalArgumentException("Invalid author id");
        return messageRepository.findAll().stream()
                .filter(message -> Objects.equals(message.getMessageAuthor(), author))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Message> findAllMessagesFromReceiver(Long senderId) {
        User receiver = this.userRepository.findById(senderId).get();
        if (receiver == null) throw new IllegalArgumentException("Invalid receiver id");
        return messageRepository.findAll().stream()
                .filter(message -> Objects.equals(message.getReceiver(), receiver))
                .collect(Collectors.toList());
    }

    @Transactional
    public User findUserByMessageId(Long messageId) {
        Message message = messageRepository.findById(messageId).get();
        if (message == null) throw new IllegalArgumentException("Invalid message id");
        return message.getMessageAuthor();
    }

    @Transactional
    public User findUserById(Long userId) {
        return userRepository.findById(userId).get();
    }
}
