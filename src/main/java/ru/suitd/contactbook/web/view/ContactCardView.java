package ru.suitd.contactbook.web.view;

import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Setter
@UIScope
@Component
@CssImport("/src/card.css")
@CssImport("/src/card-dark.css")
public class ContactCardView extends Div {

    private boolean visible = false;

    public ContactCardView() {
        String htmlContent = """
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Контактная карточка</title>
                    <link rel="stylesheet" href="/src/card-dark.css">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
                </head>
                <body>
                <div class="contact-card">
                    <div class="avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/4322/4322991.png" alt="Аватар" style="object-fit: cover;">
                    </div>
                    <div class="info">
                        <h2>Иван Иванов</h2>
                        <p>Frontend Developer</p>
                        <p>Email: ivan@example.com</p>
                        <p>Телефон: +7 (123) 456-78-90</p>
                    </div>
                    <div class="actions">
                        <button class="btn"><i class="fas fa-envelope"></i> Написать</button>
                        <button class="btn"><i class="fas fa-user"></i> Профиль</button>
                    </div>
                </div>
                
                <script src="./card-view.js"></script>
                </body>
                """;

        getElement().setProperty("innerHTML", htmlContent);
        getElement().setVisible(visible);
    }
}