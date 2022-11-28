package com.example.tipphub.email;


import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CodeGenerator {
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static Random random = new Random();

    String generate(){
        StringBuilder sb = new StringBuilder(6);
        for(int i = 0; i < 6; i++)
            sb.append(AB.charAt(random.nextInt(AB.length())));
        return sb.toString();
    }
}
