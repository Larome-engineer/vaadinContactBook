package ru.suitd.contactbook.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactResponse {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
