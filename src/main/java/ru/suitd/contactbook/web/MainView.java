package ru.suitd.contactbook.web;

import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.web.grid.ContactGrid;
import ru.suitd.contactbook.web.layout.ActionLayout;
import ru.suitd.contactbook.web.layout.CardLayout;
import ru.suitd.contactbook.web.layout.SearchLayout;
import ru.suitd.contactbook.web.layout.UploadLayout;

@Route("/contacts")
@Component
@UIScope
public class MainView extends SplitLayout {
    public MainView(
            ActionLayout actionLayout,
            UploadLayout uploadLayout,
            SearchLayout searchLayout,
            ContactGrid contactGrid,
            CardLayout cardLayout) {
        addToPrimary(actionLayout, uploadLayout, searchLayout, contactGrid);
        addToSecondary(cardLayout);
        setSplitterPosition(80);
        setWidthFull();
    }
}
