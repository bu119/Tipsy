package com.ssafy.coreweb.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.ssafy.coreweb.provider.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // ������� JWT �� �޾ƿɴϴ�.
        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
        // ��ȿ�� ��ū���� Ȯ���մϴ�.
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // ��ū�� ��ȿ�ϸ� ��ū���κ��� ���� ������ �޾ƿɴϴ�.
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            // SecurityContext �� Authentication ��ü�� �����մϴ�.
            System.out.println("authent : " + authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}