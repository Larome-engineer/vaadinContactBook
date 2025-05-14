package ru.suitd.contactbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.suitd.contactbook.model.Contact;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    List<Contact> findAllByFirstNameAndLastName(String firstName, String lastName);
    List<Contact> findAllByFirstName(String firstName);
    List<Contact> findAllByLastName(String lastName);
    void deleteByPhoneNumber(String phoneNumber);
    Contact findByPhoneNumber(String phoneNumber);
}
