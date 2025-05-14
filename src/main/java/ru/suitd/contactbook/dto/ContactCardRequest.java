package ru.suitd.contactbook.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactCardRequest {
    private String firstName;
    private String username;
    private String lastName;
    private int age;
    private String phoneNumber;
    private String email;
    private String country;
    private String city;
    private String address;
    private String workplace;
    private String post;
}
