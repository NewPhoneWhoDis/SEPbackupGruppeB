package com.example.tipphub.betround;

import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class BetroundInvite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String betroundInviteURL;

    public BetroundInvite() {
    }

    public BetroundInvite(String betroundInviteURL) {
        this.betroundInviteURL = betroundInviteURL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBetroundInviteURL() {
        return betroundInviteURL;
    }

    public void setBetroundInviteURL(String betroundInviteURL) {
        this.betroundInviteURL = betroundInviteURL;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BetroundInvite that = (BetroundInvite) o;
        return Objects.equals(id, that.id) && Objects.equals(betroundInviteURL, that.betroundInviteURL);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, betroundInviteURL);
    }
}
