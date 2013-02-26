package com.wonders.security.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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

	@RequestMapping(value = "findByAccountId", method = RequestMethod.GET)
	protected @ResponseBody
	List<Role> findByAccountId(@RequestParam long accountId) {
		return roleRepository.findByAccountId(accountId);
	}

}
