package ru.suitd.contactbook.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "contact_book")
public class Contact {

    @Id
    @Column(name = "contact_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contactId;

    @Column(name = "contact_name")
    private String firstName;

    @Column(name = "contact_username")
    private String username;

    @Column(name = "contact_surname")
    private String lastName;

    @Column(name = "contact_age")
    private int age;

    @Column(name = "contact_phone")
    private String phoneNumber;

    @Column(name = "contact_email")
    private String email;

    @Column(name = "contact_country")
    private String country;

    @Column(name = "contact_city")
    private String city;

    @Column(name = "contact_address")
    private String address;

    @Column(name = "contact_workplace")
    private String workplace;

    @Column(name = "contact_post")
    private String post;

}



