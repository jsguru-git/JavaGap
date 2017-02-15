package com.isoftnet.javagap.service.mapper;

import com.isoftnet.javagap.domain.*;
import com.isoftnet.javagap.service.dto.ContactUsDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity ContactUs and its DTO ContactUsDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ContactUsMapper {

    ContactUsDTO contactUsToContactUsDTO(ContactUs contactUs);

    List<ContactUsDTO> contactusToContactUsDTOs(List<ContactUs> contactus);

    ContactUs contactUsDTOToContactUs(ContactUsDTO contactUsDTO);

    List<ContactUs> contactUsDTOsTocontactus(List<ContactUsDTO> contactUsDTOs);
}
