package com.example.tipphub.chat;

import com.example.tipphub.betround.Betround;
import com.example.tipphub.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "message_entity")
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    private LocalDate dateOfCreation;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "messageAuthor_id")
    private User messageAuthor;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @JsonIgnore
    @OneToMany(mappedBy = "message")
    private List<Message> messages;

    public Betround getBetround() {
        return betround;
    }

    public void setBetround(Betround betround) {
        this.betround = betround;
    }

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "betround_id", referencedColumnName = "id")
    private Betround betround;

    public Message() {
    }

    public Message(Long id, String message, LocalDate dateOfCreation, User messageAuthor, User receiver, List<Message> messages, Betround betround) {
        this.id = id;
        this.message = message;
        this.dateOfCreation = dateOfCreation;
        this.messageAuthor = messageAuthor;
        this.receiver = receiver;
        this.messages = messages;
        this.betround = betround;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(LocalDate dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public User getMessageAuthor() {
        return messageAuthor;
    }

    public void setMessageAuthor(User messageAuthor) {
        this.messageAuthor = messageAuthor;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message1 = (Message) o;
        return Objects.equals(id, message1.id) && Objects.equals(message, message1.message) && Objects.equals(dateOfCreation, message1.dateOfCreation) && Objects.equals(messageAuthor, message1.messageAuthor) && Objects.equals(receiver, message1.receiver) && Objects.equals(messages, message1.messages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, message, dateOfCreation, messageAuthor, receiver, messages);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", dateOfCreation=" + dateOfCreation +
                ", messageAuthor=" + messageAuthor +
                ", receiver=" + receiver +
                '}';
    }
}
