package com.wonders.security.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.DictionaryManage;
import com.wonders.security.entity.Role;
import com.wonders.security.repository.DictionaryManageRepository;

@Controller
@RequestMapping("dictionaryManage")
public class DictionaryManageController extends AbstractCrudController<DictionaryManage, Long> {

	@Inject
	private DictionaryManageRepository dictionaryManageRepository;

	@Override
	protected MyRepository<DictionaryManage, Long> getRepository() {
		return dictionaryManageRepository;
	}
	
	@RequestMapping(value = "validateDictionaryName", method = RequestMethod.GET)
	protected @ResponseBody
	String validateDictionaryName(@RequestParam String name){
		DictionaryManage dictionaryManage = null;
		dictionaryManage = dictionaryManageRepository.findByName(name);

		if(dictionaryManage == null ){
			return "{success: true}";
		}else {
			return "{success: false}";
		}
	}
	
}
