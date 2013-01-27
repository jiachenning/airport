package com.wonders.security.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Role;
import com.wonders.security.repository.RoleRepository;

@Controller
@RequestMapping("roles")
public class RoleController extends AbstractCrudController<Role, Long> {

	@Inject
	private RoleRepository roleRepository;

	@Override
	protected MyRepository<Role, Long> getRepository() {
		return roleRepository;
	}

}
