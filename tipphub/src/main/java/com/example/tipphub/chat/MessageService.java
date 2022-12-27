package com.example.tipphub.chat;

import com.example.tipphub.user.User;
import com.example.tipphub.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    @Transactional
    public Message save(Message message) {
        return messageRepository.save(message);
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
        return messageRepository.findAll().stream()
                .filter(message -> message.getMessageAuthor().equals(author))
                .collect(Collectors.toList());
    }

    @Transactional
    public User findUserByMessageId(Long messageId) {
        Message message = messageRepository.findById(messageId).get();
        return message.getMessageAuthor();
    }
}
