package com.example.tipphub.email;

public class Email {
    private String body;
    private String subject;
    private String code;

    public Email(String code) {
        this.code = code;
        this.subject = "Tipphub - Verifizierungscode";
        this.body = "Dein Code: " + this.code;
    }


    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
