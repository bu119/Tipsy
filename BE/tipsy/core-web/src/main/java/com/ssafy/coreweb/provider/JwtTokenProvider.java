package com.ssafy.coreweb.provider;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.ssafy.coreweb.dto.TokenDto;
import com.ssafy.coreweb.dto.UserDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
	@Value("${SECRET-KEY}")
    private String secretKey;

    // ������ ��ū ��ȿ�ð� 5��
    private final long accessTokenValidTime = 30 * 10 * 1000L;
    // �������� ��ū ��ȿ�ð� 7��
    private final long refreshTokenValidTime = 1000 * 60 * 60*24*7;

    // ��ü �ʱ�ȭ, secretKey�� Base64�� ���ڵ��Ѵ�.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT ��ū ���� 
    public String createAccessToken(UserDto userDto) {
        Date now = new Date();
        
        String accessToken = Jwts.builder()
        		.claim("uid",userDto.getUid())
        		.claim("name", userDto.getName())
        		.claim("nickname", userDto.getNickname())
        		.setExpiration(new Date(now.getTime() + accessTokenValidTime))
        		.signWith(SignatureAlgorithm.HS256, secretKey)
        		.compact();

        
        return accessToken;
    }

    public String createRefreshToken() {
    	Date now = new Date();
    	
        String refreshToken = Jwts.builder()
        		.setExpiration(new Date(now.getTime() + refreshTokenValidTime))
        		.signWith(SignatureAlgorithm.HS256, secretKey)
        		.compact();
        
        return refreshToken;
    }
    
    // JWT ��ū���� ���� ���� ��ȸ
    public Authentication getAuthentication(String accessToken) {
    	
    	return new UsernamePasswordAuthenticationToken(getUserPk(accessToken), "");
    }

    // ��ū���� ȸ�� ���� ����
    public String getUserPk(String accessToken) {
        return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().get("uid");
    }

    // Request�� Header���� token ���� �����ɴϴ�. "Authorization" : "TOKEN��'
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // ��ū�� ��ȿ�� + �������� Ȯ��
    public boolean validateToken(String jwtToken) {
        try {
//        	if(!jwtToken.startsWith("Bearer")) {
//        		return false;
//        	}
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
    
}