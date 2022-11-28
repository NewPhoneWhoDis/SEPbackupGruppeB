package com.example.tipphub.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;
    private final CodeGenerator codeGenerator;

    @Autowired
    public EmailSenderService(JavaMailSender mailSender, CodeGenerator codeGenerator) {
        this.mailSender = mailSender;
        this.codeGenerator = codeGenerator;
    }



    public String sendEmail(String userEmail){
        Email email = new Email(codeGenerator.generate());
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("noreply.tipphub@gmail.com");
        msg.setTo(userEmail);
        msg.setText(email.getBody());
        msg.setSubject(email.getSubject());
        //TODO: Save code in some way & set up sender email
        mailSender.send(msg);
        System.out.println("Mail was sent out..." + email.getCode());
        return email.getCode();
    }

}
