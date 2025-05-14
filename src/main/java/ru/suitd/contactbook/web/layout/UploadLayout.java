package ru.suitd.contactbook.web.layout;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.spring.annotation.UIScope;
import com.vaadin.flow.theme.lumo.LumoIcon;
import org.springframework.stereotype.Component;
import ru.suitd.contactbook.dto.ContactResponse;
import ru.suitd.contactbook.enums.ERROR;
import ru.suitd.contactbook.enums.INFORMATION;
import ru.suitd.contactbook.enums.WARNING;
import ru.suitd.contactbook.service.ContactFileService;
import ru.suitd.contactbook.service.ConverterService;
import ru.suitd.contactbook.web.dialog.ErrorDialog;
import ru.suitd.contactbook.web.dialog.InformationDialog;
import ru.suitd.contactbook.web.dialog.WarningDialog;
import ru.suitd.contactbook.web.grid.ContactGrid;

import java.util.List;

@UIScope
@Component
public class UploadLayout extends HorizontalLayout {

    private final ConverterService converter;
    private final ContactFileService contactFileService;

    private final ContactGrid contactGrid;
    private final MemoryBuffer memoryBuffer = new MemoryBuffer();
    private final Upload uploadContactBook = configureUpload(memoryBuffer);


    public UploadLayout(ContactFileService contactFileService, ConverterService converter, ContactGrid contactGrid) {
        this.contactFileService = contactFileService;
        this.converter = converter;
        this.contactGrid = contactGrid;

        add(uploadContactBook);
        configureStyle();
        configureListeners();
    }

    private void configureStyle() {
        getStyle().set("padding-bottom", "20px");
        getStyle().set("padding-top", "20px");
        getStyle().set("padding-left", "20px");
    }

    private void configureListeners() {
        uploadContactBook.addSucceededListener(succeededEvent -> {
            try {
                contactFileService.loadContacts(memoryBuffer.getInputStream());
                contactGrid.setItems(converter.getAllContacts());
                new InformationDialog(INFORMATION.SUCCESSFULLY_UPLOADED);
            } catch (Exception e) {
                new ErrorDialog(ERROR.UPLOAD_ERROR);
            }
        });
    }

    private Upload configureUpload(MemoryBuffer buffer) {
        Upload uploadContactBook = new Upload(buffer);
        uploadContactBook.setAcceptedFileTypes("application/json");
        uploadContactBook.setUploadButton(new Button("Выберите файл"));
        uploadContactBook.setDropLabelIcon(LumoIcon.UPLOAD.create());
        uploadContactBook.setDropLabel(new Span("Перетащите файл"));
        return uploadContactBook;
    }
}
