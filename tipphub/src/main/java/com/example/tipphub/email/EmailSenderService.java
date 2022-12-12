package com.example.tipphub.email;

import com.example.tipphub.betround.Betround;
import com.example.tipphub.betround.BetroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;
    private final CodeGenerator codeGenerator;
    private final BetroundRepository betroundRepository;

    @Autowired
    public EmailSenderService(JavaMailSender mailSender, CodeGenerator codeGenerator, BetroundRepository betroundRepository) {
        this.mailSender = mailSender;
        this.codeGenerator = codeGenerator;
        this.betroundRepository = betroundRepository;
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

    public void sendEmailInviteBetround(Long betroundId, String userEmail){
        Betround betround = betroundRepository.findById(betroundId).get();
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom("noreply.tipphub@gmail.com");
        msg.setTo(userEmail);
        msg.setText("http://localhost:4200/betround/" + betround.getInviteURL());
        msg.setSubject("Tipphub Einladung");
        mailSender.send(msg);
    }
}
