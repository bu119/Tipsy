package com.ssafy.coreweb.provider;

import static org.mockito.Mockito.timeout;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ssafy.coreweb.dto.UserDto;
import com.ssafy.domainauth.entity.Auth;
import com.ssafy.domainauth.repo.AuthRepository;

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

	private final AuthRepository authRepository;
	
	// 액세스 토큰 유효시간 5분
    private final long accessTokenValidTime = 30 * 10 * 1000L;
    // 리프레시 토큰 유효시간 7일
    private final long refreshTokenValidTime = 1000 * 60 * 60*24*7;
    
    public String test = "test";

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // JWT 토큰 생성
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

    public int getUserPk(String accessToken) {
        return (int)Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().get("uid");
    	
    }

    public String getUserName(String accessToken) {
    	return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().get("name");
    	
    }
    
    public String getUserNickname(String accessToken) {
        return (String) Jwts.parser().setSigningKey(secretKey).parseClaimsJws(accessToken).getBody().get("nickname");
    }
 
    public void saveRefreshToken(Long uid, String refreshToken) {
    	authRepository.save(new Auth(uid,refreshToken));
    }
    
    // 토큰의 유효성 + 만료일자 확인
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