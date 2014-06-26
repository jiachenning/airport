package com.wonders.security.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Role;
import com.wonders.security.repository.RoleRepository;
import com.wonders.security.service.RoleService;

@Controller
@RequestMapping("roles")
public class RoleController extends AbstractCrudController<Role, Long> {

	@Inject
	private RoleRepository roleRepository;
	
	@Inject
	private RoleService roleService;

	@Override
	protected MyRepository<Role, Long> getRepository() {
		return roleRepository;
	}

	@RequestMapping(value = "findByAccountId", method = RequestMethod.GET)
	protected @ResponseBody
	List<Role> findByAccountId(@RequestParam long accountId) {
		return roleRepository.findByAccountId(accountId);
	}
	
	@RequestMapping(value = "addRoleAuthority")
	protected @ResponseBody
	String addRoleAuthority(@RequestParam long roleId, 
			@RequestParam(required = false) long... authIds) {
		roleService.addRoleAuthority(roleId, authIds);
		return "{success: true}";
	}
	
	@RequestMapping(value = "findRoleAuthority", method = RequestMethod.GET)
	protected @ResponseBody
	String findRoleAuthority(@RequestParam long roleId){
		return roleService.findRoleAuthority(roleId);
	}
	
	@RequestMapping(value = "findRoleAuthority/{roleId}", method = RequestMethod.GET)
	protected @ResponseBody
	List<Role> findRoleAuthorityByRoleId(@PathVariable long roleId){
		return roleRepository.findRoleAuthorityByRoleId(roleId);
	}
	
	@RequestMapping(value = "isCodeExist", method = RequestMethod.GET)
	protected @ResponseBody
	String isCodeExist(@RequestParam String code){
		Role role = null;
		role = roleRepository.findByCode(code);

		if(role == null ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}
}
