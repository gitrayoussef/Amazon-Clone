<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StripPaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'card_no'=>['required'],
            'exp_year' => ['required'],
            'exp_month' => ['required'],
            'cvv_no' => ['required'],  
            'amount'=>  ['required'],  
            'desc'=>[],
        ];
    }
}
