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
import com.wonders.security.entity.Group;
import com.wonders.security.repository.GroupRepository;

@Controller
@RequestMapping("groups")
public class GroupController extends AbstractCrudController<Group, Long> {

	@Inject
	private GroupRepository groupRepository;

	@Override
	protected MyRepository<Group, Long> getRepository() {
		return groupRepository;
	}
	
	@RequestMapping(value = "findByParentId/{parentId}", method = RequestMethod.GET)
	protected @ResponseBody
	List<Group> findByParentId(@PathVariable long parentId) {
		return groupRepository.findByParentId(parentId);
	}
	
	@RequestMapping(value = "findAllGroup", method = RequestMethod.GET)
	protected @ResponseBody
	List<Group> findAllGroup() {
		return groupRepository.findAll();
	}
	
	@RequestMapping(value = "findByAccount/{accountId}", method = RequestMethod.GET)
	protected @ResponseBody
	List<Group> findByAccount(@PathVariable long accountId) {
		return groupRepository.findByAccount(accountId);
	}
	
	@RequestMapping(value = "findByNameLike", method = RequestMethod.GET)
	protected @ResponseBody
	List<Group> findByNameLike(@RequestParam(defaultValue = "") String name) {
		if(name.equals("")){
			return groupRepository.findAll();
		}
		return groupRepository.findByNameLike("%" + name + "%");
	}
	
	@RequestMapping(value = "isNameExist", method = RequestMethod.GET)
	protected @ResponseBody
	String isNameExist(@RequestParam String name){
		Group group = null;
		group = groupRepository.findByName(name);

		if(group == null ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}
	
}
