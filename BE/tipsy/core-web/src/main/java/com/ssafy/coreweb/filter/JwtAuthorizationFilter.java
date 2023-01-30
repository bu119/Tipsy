package com.ssafy.coreweb.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.coreweb.provider.JwtTokenProvider;
import com.ssafy.domainauth.dao.AuthDao;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final AuthDao authDao;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws IOException, ServletException {
    	
    	// ������� JWT �� �޾ƿɴϴ�.
        String token = jwtTokenProvider.resolveToken(req); //request.getHeader("Authorization");
        // ��ȿ�� ��ū���� Ȯ���մϴ�.
        
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            //res.addHeader("Authorization", "Bearer "+ authentication.getName());
            chain.doFilter(req, res);
            System.out.println("�����ȵ�");
            return;
        }
        // ��ū�� ��ȿ�ϸ� ��ū���κ��� ���� ������ �޾ƿɴϴ�.
        String uid = jwtTokenProvider.getUserPk(token);
        
        // ������ �������̸�
        if(uid !=null) {
        	
        }
    }
}