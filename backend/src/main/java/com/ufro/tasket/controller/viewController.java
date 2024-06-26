package com.ufro.tasket.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class viewController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // Redirige todas las peticiones no API al index.html
        return "forward:/";
    }
}