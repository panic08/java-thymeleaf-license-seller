package ru.marthastudios.licenserseller.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.marthastudios.licenserseller.dto.CallDto;
import ru.marthastudios.licenserseller.mapper.CallToCallDtoMapperImpl;
import ru.marthastudios.licenserseller.model.Call;
import ru.marthastudios.licenserseller.repository.CallRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CallService {
    private final CallRepository callRepository;
    private final CallToCallDtoMapperImpl callToCallDtoMapper;

    public CallDto create(CallDto callDto){
        Call call = Call.builder()
                .firstName(callDto.getFirstName())
                .phoneNumber(callDto.getPhoneNumber())
                .createdAt(System.currentTimeMillis())
                .build();

        return callToCallDtoMapper.callToCallDto(callRepository.save(call));
    }

    public List<CallDto> getAll(){
        Iterable<Call> callIterable = callRepository.findAll();
        return callToCallDtoMapper.callListToCallDtoList(StreamSupport.stream(callIterable.spliterator(), false).toList());
    }

    public void deleteById(long id){
        callRepository.deleteById(id);
    }

}
