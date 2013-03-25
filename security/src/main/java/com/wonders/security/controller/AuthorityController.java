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
import com.wonders.security.entity.Authority;
import com.wonders.security.repository.AuthorityRepository;

@Controller
@RequestMapping("authority")
public class AuthorityController extends AbstractCrudController<Authority, Long> {

	@Inject
	private AuthorityRepository authorityRepository;

	@Override
	protected MyRepository<Authority, Long> getRepository() {
		return authorityRepository;
	}
	
	@RequestMapping(value = "findByParentId/{parentId}", method = RequestMethod.GET)
	protected @ResponseBody
	List<Authority> findByParentId(@PathVariable long parentId) {
		return authorityRepository.findByParentId(parentId);
	}
	
	@RequestMapping(value = "validateAuthorityCode", method = RequestMethod.GET)
	protected @ResponseBody
	String validateAuthorityCode(@RequestParam String code){
		List<Authority> list = authorityRepository.validateAuthorityCode(code);
		if(list.size() == 0 ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}

}
