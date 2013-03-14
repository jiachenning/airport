package com.wonders.security.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.wonders.framework.controller.AbstractCrudController;
import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.DictionaryManage;
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
	
}
